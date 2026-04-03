'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Upload, FileText, Image, Info, CheckCircle, XCircle, Download, Zap } from 'lucide-react';

export default function BulkUploadPage() {
  const [csvFile, setCsvFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);

  const handleCsvChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const valid = f.name.endsWith('.csv') || f.name.endsWith('.xlsx') || f.name.endsWith('.xls');
    if (!valid) { toast.error('Please upload a CSV or Excel file'); return; }
    setCsvFile(f);
    setResults(null);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    toast.success(`${files.length} image(s) selected`);
  };

  const handleUpload = async () => {
    if (!csvFile) { toast.error('Please select a CSV file first'); return; }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', csvFile);

    // Attach images keyed by filename
    imageFiles.forEach((img) => {
      formData.append(`img_${img.name}`, img);
    });

    try {
      const response = await fetch('/api/admin/products/bulk-upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setResults(data.results);
        setCsvFile(null);
        setImageFiles([]);
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csv = `name,description,categorySlug,subcategorySlug,mainImage,galleryImages,sizes,material,productCare,additionalInfo,colorName,colorCode,sku,slug,isActive,isFeatured,isNewArrival,tags,sortOrder
"Elegant Anarkali Suit","Beautiful embroidered anarkali suit","anarkali-dupatta-sets","a-line-kalidar-suits","anarkali-red-main.jpg","anarkali-red-1.jpg,anarkali-red-2.jpg","S:10,M:15,L:20,XL:10","Georgette","Dry clean only","","Red","#FF0000","AVT001-RED","elegant-anarkali-suit-red",TRUE,TRUE,TRUE,"wedding,festive",1`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bulk-upload-template.csv';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    toast.success('Template downloaded');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Upload className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bulk Product Upload</h1>
              <p className="text-sm text-gray-500 mt-0.5">Upload CSV + images together — system handles the rest</p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2"><Info size={16} /> How it works</h3>
          <ol className="text-sm text-blue-800 space-y-1.5 list-decimal list-inside">
            <li>Download the CSV template below</li>
            <li>In <code className="bg-blue-100 px-1 rounded">mainImage</code> / <code className="bg-blue-100 px-1 rounded">galleryImages</code> columns, put just the <strong>filename</strong> (e.g. <code className="bg-blue-100 px-1 rounded">product1.jpg</code>)</li>
            <li>Select your CSV file in Step 1</li>
            <li>Select all your image files in Step 2 (multi-select supported)</li>
            <li>Click Upload — images go to Cloudflare R2 automatically</li>
          </ol>
        </div>

        {/* Template */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Download size={20} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Download CSV Template</p>
              <p className="text-xs text-gray-500">Use filenames only in image columns</p>
            </div>
          </div>
          <button onClick={downloadTemplate} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
            <Download size={16} /> Download
          </button>
        </div>

        {/* Step 1 — CSV */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center font-bold">1</span>
            Select CSV / Excel File
          </h3>
          <label htmlFor="csv-upload" className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition">
            <FileText className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-sm font-medium text-gray-700">{csvFile ? csvFile.name : 'Click to select CSV or Excel file'}</p>
            {csvFile && <p className="text-xs text-gray-400 mt-1">{(csvFile.size / 1024).toFixed(1)} KB</p>}
            <input id="csv-upload" type="file" accept=".csv,.xlsx,.xls" onChange={handleCsvChange} className="hidden" />
          </label>
        </div>

        {/* Step 2 — Images */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-purple-500 text-white rounded-full text-xs flex items-center justify-center font-bold">2</span>
            Select Product Images
            <span className="text-xs font-normal text-gray-400 ml-1">(filenames must match CSV)</span>
          </h3>
          <label htmlFor="img-upload" className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/40 transition">
            <Image className="mx-auto text-gray-400 mb-2" size={32} />
            {imageFiles.length > 0 ? (
              <div>
                <p className="text-sm font-medium text-gray-700">{imageFiles.length} image(s) selected</p>
                <div className="flex flex-wrap gap-1 justify-center mt-2 max-h-20 overflow-y-auto">
                  {imageFiles.map((f, i) => (
                    <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{f.name}</span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm font-medium text-gray-700">Click to select images (multi-select)</p>
            )}
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP supported</p>
            <input id="img-upload" type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
          </label>
        </div>

        {/* Upload Button */}
        {csvFile && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {uploading ? (
              <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> Processing...</>
            ) : (
              <><Zap size={22} /> Upload Products</>
            )}
          </button>
        )}

        {/* Results */}
        {results && (
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <CheckCircle className="text-green-500" size={24} /> Upload Results
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Total', value: results.total, color: 'blue' },
                { label: 'Success', value: results.success, color: 'green' },
                { label: 'Failed', value: results.failed, color: 'red' },
              ].map(({ label, value, color }) => (
                <div key={label} className={`bg-${color}-50 border border-${color}-200 rounded-xl p-4 text-center`}>
                  <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
                  <p className="text-xs text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {results.imageUploads && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Images Total', value: results.imageUploads.total, color: 'purple' },
                  { label: 'Uploaded', value: results.imageUploads.success, color: 'green' },
                  { label: 'Failed', value: results.imageUploads.failed, color: 'orange' },
                ].map(({ label, value, color }) => (
                  <div key={label} className={`bg-${color}-50 border border-${color}-200 rounded-xl p-4 text-center`}>
                    <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
                    <p className="text-xs text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            )}

            {results.errors?.length > 0 && (
              <div>
                <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <XCircle size={18} /> Errors ({results.errors.length})
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {results.errors.map((err, i) => (
                    <div key={i} className="bg-red-50 border-l-4 border-red-400 rounded p-3">
                      <p className="text-sm font-semibold text-gray-800">Row {err.row}: {err.data}</p>
                      <p className="text-xs text-red-600 mt-0.5">{err.error}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
