'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  X,
  Edit2,
  Sparkles,
  AlertCircle,
  AlertTriangle,
  Check,
  Loader2
} from 'lucide-react'

// ─── Delete Confirmation Modal ────────────────────────────────────────────────
function DeleteModal({ isOpen, customId, onConfirm, onCancel, loading }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 max-w-sm w-full">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Delete Design?</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              This will permanently delete design{' '}
              <span className="font-mono font-bold text-accent">{customId}</span> and all its
              photos from storage. This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 w-full pt-2">
            <Button variant="outline" onClick={onCancel} disabled={loading} className="flex-1 border-gray-200">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white border-0 shadow-sm shadow-red-200"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-1.5" />Deleting…</>
              ) : (
                'Yes, Delete'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ManageDesigns() {
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Form state
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Dress')
  const [images, setImages] = useState([]) // { id, type:'existing'|'new', url, file }

  // Edit state
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editCustomId, setEditCustomId] = useState(null)
  const [deletedUrls, setDeletedUrls] = useState([])

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null) // { id, customId, image_urls }
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fileInputRef = useRef(null)
  const alertRef = useRef(null)

  const fetchDesigns = async () => {
    setLoading(true)
    const { data, error: e } = await supabase
      .from('designs')
      .select('*')
      .order('created_at', { ascending: false })
    if (e) setError(e.message)
    else setDesigns(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchDesigns() }, [])

  useEffect(() => {
    if (error || success) alertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [error, success])

  // ── Helpers ────────────────────────────────────────────────────────────────
  const generateCustomId = async () => {
    const { data } = await supabase
      .from('designs')
      .select('custom_id')
      .order('created_at', { ascending: false })
      .limit(1)
    if (!data || data.length === 0) return 'RT1001'
    return `RT${parseInt(data[0].custom_id.replace('RT', ''), 10) + 1}`
  }

  const getStoragePath = (url) => {
    try {
      const marker = '/designs-images/'
      const idx = url.indexOf(marker)
      if (idx !== -1) return decodeURIComponent(url.slice(idx + marker.length))
    } catch (_) {}
    return null
  }

  // ── File handling ──────────────────────────────────────────────────────────
  const triggerUpload = () => fileInputRef.current?.click()

  const handleFileChange = (e) => {
    setError(null); setSuccess(null)
    const files = Array.from(e.target.files || [])
    if (images.length + files.length > 3) {
      setError('Maximum 3 images allowed per design.')
      return
    }
    const valid = ['image/jpeg', 'image/png', 'image/webp']
    const newImgs = files.map(file => {
      if (!valid.includes(file.type)) { setError('Only JPG, PNG, or WebP allowed.'); return null }
      return { id: `${Math.random().toString(36).slice(2)}-${Date.now()}`, type: 'new', url: URL.createObjectURL(file), file }
    }).filter(Boolean)
    setImages(prev => [...prev, ...newImgs])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleRemove = (index) => {
    setError(null); setSuccess(null)
    const img = images[index]
    if (img.type === 'new') URL.revokeObjectURL(img.url)
    else setDeletedUrls(prev => [...prev, img.url])
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true); setError(null); setSuccess(null)

    if (!name || !price || !category) { setError('Please fill all fields.'); setSaving(false); return }
    if (images.length === 0) { setError('At least one image is required.'); setSaving(false); return }

    try {
      console.log('--- handleSubmit Start ---')
      console.log('isEditing:', isEditing)
      console.log('editId:', editId)
      console.log('editCustomId:', editCustomId)
      console.log('images state:', images)

      const customId = isEditing ? editCustomId : await generateCustomId()
      console.log('customId determined:', customId)
      const finalUrls = []

      for (let i = 0; i < images.length; i++) {
        const img = images[i]
        console.log(`Processing image ${i}:`, img)
        if (img.type === 'existing') {
          finalUrls.push(img.url)
          console.log(`Existing image url:`, img.url)
        } else {
          const ext = img.file.name.split('.').pop() || 'jpg'
          const path = `${customId}/${Date.now()}_${i}.${ext}`
          console.log(`Uploading new image to path: ${path}`)
          const { error: upErr } = await supabase.storage.from('designs-images').upload(path, img.file)
          if (upErr) {
            console.error(`Upload error for image ${i}:`, upErr)
            throw upErr
          }
          const { data } = supabase.storage.from('designs-images').getPublicUrl(path)
          finalUrls.push(data.publicUrl)
          console.log(`Uploaded new image url:`, data.publicUrl)
        }
      }
      console.log('finalUrls compiled:', finalUrls)

      if (isEditing) {
        console.log('Updating design in DB...', { editId, finalUrls })
        const { data: updData, error: updErr } = await supabase
          .from('designs')
          .update({ name, price: parseFloat(price), category, image_urls: finalUrls })
          .eq('id', editId)
          .select()
        console.log('DB Update result:', { data: updData, error: updErr })
        if (updErr) throw updErr
        if (!updData || updData.length === 0) {
          throw new Error('Failed to update design in database. You might not have permission (check if your email is confirmed in Supabase).')
        }

        // Clean up removed images from storage
        if (deletedUrls.length > 0) {
          console.log('Cleaning up deleted urls from storage:', deletedUrls)
          const paths = deletedUrls.map(getStoragePath).filter(Boolean)
          if (paths.length > 0) await supabase.storage.from('designs-images').remove(paths)
        }
        setSuccess(`Design ${customId} updated successfully!`)
      } else {
        console.log('Inserting new design in DB...', { customId, finalUrls })
        const { data: insData, error: insErr } = await supabase
          .from('designs')
          .insert([{ custom_id: customId, name, price: parseFloat(price), category, image_urls: finalUrls }])
          .select()
        console.log('DB Insert result:', { data: insData, error: insErr })
        if (insErr) throw insErr
        if (!insData || insData.length === 0) {
          throw new Error('Failed to insert design in database. You might not have permission (check if your email is confirmed in Supabase).')
        }
        setSuccess(`Design ${customId} added successfully!`)
      }

      images.forEach(img => { if (img.type === 'new') URL.revokeObjectURL(img.url) })
      resetForm()
      await fetchDesigns()
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const resetForm = () => {
    setName(''); setPrice(''); setCategory('Dress')
    setImages([]); setDeletedUrls([])
    setIsEditing(false); setEditId(null); setEditCustomId(null)
    setError(null)
  }

  // ── Edit ───────────────────────────────────────────────────────────────────
  const handleStartEdit = (design) => {
    setError(null); setSuccess(null)
    images.forEach(img => { if (img.type === 'new') URL.revokeObjectURL(img.url) })

    setIsEditing(true)
    setEditId(design.id)
    setEditCustomId(design.custom_id)
    setName(design.name)
    setPrice(design.price.toString())
    setCategory(design.category)
    setDeletedUrls([])

    // Map existing URLs directly — no cache-busting (Supabase rejects arbitrary query params)
    setImages((design.image_urls || []).map(url => ({
      id: url,
      type: 'existing',
      url: url
    })))

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    images.forEach(img => { if (img.type === 'new') URL.revokeObjectURL(img.url) })
    resetForm()
  }

  // ── Delete (via modal) ─────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)

    const { error: delErr } = await supabase.from('designs').delete().eq('id', deleteTarget.id)
    if (!delErr && deleteTarget.image_urls?.length > 0) {
      const paths = deleteTarget.image_urls.map(getStoragePath).filter(Boolean)
      if (paths.length > 0) await supabase.storage.from('designs-images').remove(paths)
    }
    if (delErr) setError(delErr.message)
    else {
      setSuccess(`Design ${deleteTarget.customId} deleted.`)
      if (isEditing && editId === deleteTarget.id) handleCancelEdit()
    }

    setDeleteLoading(false)
    setDeleteTarget(null)
    await fetchDesigns()
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <DeleteModal
        isOpen={!!deleteTarget}
        customId={deleteTarget?.customId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />

      <div className="max-w-6xl mx-auto pb-12">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Manage Designs</h1>
          <p className="text-gray-500 text-sm mt-1">Add, edit, and delete catalog designs with their photos.</p>
        </div>

        {/* Alerts */}
        <div ref={alertRef}>
          {error && (
            <div className="bg-red-50 border border-red-200/60 text-red-700 p-4 rounded-2xl flex items-start gap-3 text-sm mb-6">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
              <div><p className="font-bold">Action Failed</p><p className="mt-0.5">{error}</p></div>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200/60 text-green-800 p-4 rounded-2xl flex items-start gap-3 text-sm mb-6">
              <Check className="w-5 h-5 shrink-0 text-green-600 mt-0.5" />
              <div><p className="font-bold">Success</p><p className="mt-0.5">{success}</p></div>
            </div>
          )}
        </div>

        {/* Form Card */}
        <Card className="bg-white mb-10 border border-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.03)] rounded-3xl">
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2.5 text-foreground">
                {isEditing ? (
                  <>
                    <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                    <span>Edit Design:</span>
                    <span className="font-mono bg-brand-pink text-accent px-2 py-0.5 rounded-lg text-sm border border-brand-pink-dark">
                      {editCustomId}
                    </span>
                  </>
                ) : (
                  <><Plus className="w-5 h-5 text-primary" /> Add New Design</>
                )}
              </h2>
              {isEditing && (
                <Button variant="outline" onClick={handleCancelEdit} className="text-xs h-9 py-1 px-3">
                  Cancel Edit
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Fields */}
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Design Name</label>
                  <Input value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Royal Silk Saree" className="bg-gray-50 focus:bg-white text-base py-3" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Price (₹)</label>
                  <Input type="number" value={price} onChange={e => setPrice(e.target.value)} required placeholder="e.g. 2400" className="bg-gray-50 focus:bg-white text-base py-3" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-base h-[50px] font-medium transition-all"
                  >
                    <option value="Dress">Dress</option>
                    <option value="Blouse">Blouse</option>
                  </select>
                </div>
              </div>

              {/* Upload */}
              <div>
                <div className="flex items-center justify-between mb-3 ml-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Photos (Max 3)</label>
                  <span className="text-xs font-bold text-gray-400">{images.length} of 3</span>
                </div>

                {images.length < 3 && (
                  <div className="flex mb-5">
                    <div
                      onClick={triggerUpload}
                      className="group cursor-pointer flex items-center gap-3 border border-dashed border-primary/30 hover:border-primary bg-brand-pink/5 hover:bg-brand-pink/15 rounded-2xl p-4 transition-all duration-200 max-w-sm w-full"
                    >
                      <Upload className="w-5 h-5 text-primary group-hover:scale-110 transition-transform shrink-0" />
                      <span className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors">
                        Add Photos (Max 3)
                      </span>
                      <span className="text-xs text-gray-400 font-mono ml-auto">({images.length}/3)</span>
                    </div>
                  </div>
                )}
                {images.length >= 3 && (
                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 mb-5 max-w-sm font-medium">
                    <Check className="w-4 h-4 text-green-600 bg-green-100 rounded-full p-0.5 shrink-0" />
                    Max images reached. Remove a photo to replace.
                  </div>
                )}

                <input ref={fileInputRef} type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />

                {/* Natural-height image preview grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-1">
                    {images.map((img, index) => (
                      <div key={img.id} className="bg-white border border-gray-200 rounded-2xl p-2 shadow-sm hover:shadow-md transition-all relative group">

                        {/* Image: natural height, object-contain, no forced aspect ratio */}
                        <div className="rounded-xl overflow-hidden bg-white border border-gray-100 flex items-center justify-center p-1">
                          <img
                            src={img.url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-auto block object-contain rounded-lg"
                            style={{ imageRendering: 'auto', maxHeight: '240px' }}
                          />
                        </div>

                        {/* Main image badge */}
                        {index === 0 && (
                          <span className="absolute top-4 left-4 bg-accent text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10">
                            Main Image
                          </span>
                        )}

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => handleRemove(index)}
                          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all z-10 cursor-pointer"
                          title="Remove photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="border-t border-gray-100 pt-6 flex justify-end gap-3">
                {isEditing && (
                  <Button type="button" variant="outline" onClick={handleCancelEdit} disabled={saving} className="px-6 border-gray-200">
                    Discard Changes
                  </Button>
                )}
                <Button type="submit" disabled={saving} className="px-8 flex items-center gap-2 text-base h-12">
                  {saving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>Saving…</span></>
                  ) : (
                    isEditing ? 'Save Changes' : 'Add Design'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Catalog Table */}
        <Card className="bg-white border border-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.03)] rounded-3xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-lg text-foreground">Catalog Inventory</h3>
            <p className="text-xs text-gray-400 mt-0.5">Edit or delete existing designs. Deleting also removes photos from storage.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary mb-2" />
                      Loading…
                    </td>
                  </tr>
                ) : designs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                      <ImageIcon className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                      No designs yet.
                    </td>
                  </tr>
                ) : (
                  designs.map(design => (
                    <tr key={design.id} className="hover:bg-gray-50/70 transition-colors align-middle">
                      {/* Thumbnail — natural height, object-contain, white bg */}
                      <td className="px-6 py-3">
                        {design.image_urls?.[0] ? (
                          <div className="w-14 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm flex items-center justify-center p-0.5 relative">
                            <img
                              src={design.image_urls[0]}
                              alt=""
                              className="w-full h-auto block object-contain rounded-lg"
                              style={{ maxHeight: '56px' }}
                            />
                            {design.image_urls.length > 1 && (
                              <span className="absolute bottom-0.5 right-0.5 bg-black/70 text-[7px] font-extrabold text-white px-1 py-0.5 rounded">
                                +{design.image_urls.length - 1}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-gray-300" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono font-semibold text-gray-700 text-xs">{design.custom_id}</td>
                      <td className="px-6 py-4 font-bold text-foreground max-w-[200px] truncate">{design.name}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          design.category === 'Dress' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                        }`}>
                          {design.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-extrabold text-gray-800">₹{design.price}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-1">
                          <Button variant="ghost" className="text-primary hover:bg-brand-pink/50 p-2.5" onClick={() => handleStartEdit(design)} title="Edit design">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-red-500 hover:bg-red-50 hover:text-red-600 p-2.5"
                            onClick={() => setDeleteTarget({ id: design.id, customId: design.custom_id, image_urls: design.image_urls || [] })}
                            title="Delete design and photos"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}
