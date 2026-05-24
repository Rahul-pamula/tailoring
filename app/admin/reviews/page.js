'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Check, X, Trash2, Clock, AlertTriangle, Loader2, Star, ImageIcon } from 'lucide-react'

// ─── Delete Confirmation Modal ────────────────────────────────────────────────
function DeleteModal({ isOpen, onConfirm, onCancel, loading }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 max-w-sm w-full animate-fade-in">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Delete Review?</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              This will permanently delete the review and all its uploaded photos from storage. This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 w-full pt-2">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white border-0 shadow-sm shadow-red-200"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-1.5" /> Deleting…</>
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
export default function ManageReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null) // review id being actioned

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null) // { id, image_urls }
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchReviews = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    setReviews(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchReviews() }, [])

  const handleApprove = async (id) => {
    setActionLoading(id)
    const { error } = await supabase
      .from('reviews')
      .update({ is_approved: true })
      .eq('id', id)
    if (error) console.error(error.message)
    await fetchReviews()
    setActionLoading(null)
  }

  const handleReject = async (id) => {
    setActionLoading(id)
    const { error } = await supabase
      .from('reviews')
      .update({ is_approved: false })
      .eq('id', id)
    if (error) console.error(error.message)
    await fetchReviews()
    setActionLoading(null)
  }

  // Extract storage path from Supabase public URL
  const getStoragePath = (url) => {
    try {
      // Handles paths like .../storage/v1/object/public/reviews-images/reviews/…
      const marker = '/reviews-images/'
      const idx = url.indexOf(marker)
      if (idx !== -1) return decodeURIComponent(url.slice(idx + marker.length))
    } catch (_) {}
    return null
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)

    // 1. Delete uploaded images from Supabase Storage
    const { image_urls = [] } = deleteTarget
    if (image_urls.length > 0) {
      const paths = image_urls.map(getStoragePath).filter(Boolean)
      if (paths.length > 0) {
        await supabase.storage.from('reviews-images').remove(paths)
      }
    }

    // 2. Delete the database row
    const { error } = await supabase.from('reviews').delete().eq('id', deleteTarget.id)
    if (error) console.error(error.message)

    setDeleteLoading(false)
    setDeleteTarget(null)
    await fetchReviews()
  }

  return (
    <>
      <DeleteModal
        isOpen={!!deleteTarget}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />

      <div className="max-w-6xl mx-auto pb-12">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />
            Manage Reviews
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Approve, reject, or delete customer reviews. Deleting also removes photos from storage.
          </p>
        </div>

        <Card className="bg-white border border-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.03)] rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Photos</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary mb-2" />
                      Loading reviews…
                    </td>
                  </tr>
                ) : reviews.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50/70 transition-colors align-top">
                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {review.is_approved ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                            <Check className="w-3 h-3" /> Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-100">
                            <Clock className="w-3 h-3" /> Pending
                          </span>
                        )}
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 font-bold text-foreground whitespace-nowrap">
                        {review.name}
                      </td>

                      {/* Message */}
                      <td className="px-6 py-4 max-w-[220px]">
                        <p className="line-clamp-2 text-gray-600 leading-relaxed">
                          {review.message}
                        </p>
                      </td>

                      {/* Photos — natural height, object-contain */}
                      <td className="px-6 py-4">
                        {review.image_urls && review.image_urls.length > 0 ? (
                          <div className="flex gap-2">
                            {review.image_urls.map((url, idx) => (
                              <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                title="View full image"
                                className="block w-14 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all hover:scale-105"
                              >
                                <img
                                  src={url}
                                  alt=""
                                  className="w-full h-auto block object-contain"
                                  style={{ imageRendering: 'auto' }}
                                />
                              </a>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-300 text-xs flex items-center gap-1">
                            <ImageIcon className="w-3.5 h-3.5" /> None
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                        {new Date(review.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-1.5">
                          {actionLoading === review.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          ) : (
                            <>
                              {!review.is_approved ? (
                                <Button
                                  variant="outline"
                                  className="px-3 py-1.5 h-auto text-xs bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                                  onClick={() => handleApprove(review.id)}
                                >
                                  <Check className="w-3.5 h-3.5 mr-1" /> Approve
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  className="px-3 py-1.5 h-auto text-xs bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                                  onClick={() => handleReject(review.id)}
                                >
                                  <X className="w-3.5 h-3.5 mr-1" /> Reject
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                className="text-red-500 hover:bg-red-50 hover:text-red-600 p-2.5"
                                onClick={() => setDeleteTarget({ id: review.id, image_urls: review.image_urls || [] })}
                                title="Delete review and its photos"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
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
