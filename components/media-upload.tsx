'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, Upload, X, Plus, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'

interface MediaUploadProps {
  onUploadSuccess?: (file: any) => void
  allowedTypes?: string[]
  maxSize?: number
  category?: string
}

interface UploadFile extends File {
  preview?: string
  progress?: number
  status?: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export function MediaUpload({ 
  onUploadSuccess, 
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'video/mp4'],
  maxSize = 10 * 1024 * 1024,
  category = 'general'
}: MediaUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [uploadingCount, setUploadingCount] = useState(0)
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [altText, setAltText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(category)
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => {
      const uploadFile = file as UploadFile
      uploadFile.preview = URL.createObjectURL(file)
      uploadFile.status = 'pending'
      uploadFile.progress = 0
      return uploadFile
    })
    
    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: true
  })

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev]
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const uploadFile = async (file: UploadFile, index: number) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', selectedCategory)
    formData.append('altText', altText)
    formData.append('tags', JSON.stringify(tags))

    try {
      setFiles(prev => {
        const newFiles = [...prev]
        newFiles[index].status = 'uploading'
        newFiles[index].progress = 0
        return newFiles
      })

      setUploadingCount(prev => prev + 1)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      setFiles(prev => {
        const newFiles = [...prev]
        newFiles[index].status = 'success'
        newFiles[index].progress = 100
        return newFiles
      })

      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded successfully.`,
      })

      onUploadSuccess?.(result.file)

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      
      setFiles(prev => {
        const newFiles = [...prev]
        newFiles[index].status = 'error'
        newFiles[index].error = errorMessage
        return newFiles
      })

      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setUploadingCount(prev => prev - 1)
    }
  }

  const uploadAllFiles = async () => {
    const pendingFiles = files.filter(file => file.status === 'pending')
    
    for (let i = 0; i < files.length; i++) {
      if (files[i].status === 'pending') {
        await uploadFile(files[i], i)
      }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return '🖼️'
    if (file.type.startsWith('video/')) return '🎥'
    if (file.type === 'application/pdf') return '📄'
    return '📎'
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Media Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="speeches">Speeches</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="photos">Photos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="altText">Alt Text (for images)</Label>
            <Input
              id="altText"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Describe the image for accessibility"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add a tag"
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
            />
            <Button type="button" onClick={addTag} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-primary">Drop the files here...</p>
          ) : (
            <div>
              <p className="mb-2">Drag & drop files here, or click to select files</p>
              <p className="text-sm text-muted-foreground">
                Supports: Images (JPEG, PNG, WebP), Videos (MP4), Documents (PDF)
              </p>
              <p className="text-sm text-muted-foreground">
                Maximum file size: {formatFileSize(maxSize)}
              </p>
            </div>
          )}
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Files to Upload</h3>
              <Button 
                onClick={uploadAllFiles}
                disabled={uploadingCount > 0 || files.every(f => f.status !== 'pending')}
              >
                Upload All ({files.filter(f => f.status === 'pending').length})
              </Button>
            </div>

            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="text-2xl">{getFileIcon(file)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                    
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <Progress value={file.progress} className="h-2" />
                      </div>
                    )}
                    
                    {file.status === 'error' && file.error && (
                      <Alert className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{file.error}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {file.status === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    
                    {file.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={file.status === 'uploading'}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 