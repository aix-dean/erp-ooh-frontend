"use client";

import React, { useState } from 'react';
import { Form, Input, Select, Textarea, Button } from '@/components/ui/forms';

interface BillboardFormData {
  id: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  type: string;
  size: string;
  illumination: string;
  status: string;
}

interface BillboardFormProps {
  initialData?: Partial<BillboardFormData>;
  onSubmit: (data: BillboardFormData) => void;
  onCancel: () => void;
}

const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<BillboardFormData>({
    id: initialData.id || '',
    location: {
      address: initialData.location?.address || '',
      latitude: initialData.location?.latitude || 0,
      longitude: initialData.location?.longitude || 0,
    },
    type: initialData.type || 'Digital',
    size: initialData.size || '',
    illumination: initialData.illumination || 'LED',
    status: initialData.status || 'Active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof BillboardFormData] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {initialData.id ? 'Edit Billboard' : 'Add New Billboard'}
      </h2>

      <Form onSubmit={handleSubmit}>
        <Input
          label="Billboard ID"
          value={formData.id}
          onChange={(e) => handleInputChange('id', e.target.value)}
          required
        />

        <Input
          label="Address"
          value={formData.location.address}
          onChange={(e) => handleInputChange('location.address', e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Latitude"
            type="number"
            value={formData.location.latitude.toString()}
            onChange={(e) => handleInputChange('location.latitude', parseFloat(e.target.value) || 0)}
            required
          />
          <Input
            label="Longitude"
            type="number"
            value={formData.location.longitude.toString()}
            onChange={(e) => handleInputChange('location.longitude', parseFloat(e.target.value) || 0)}
            required
          />
        </div>

        <Select
          label="Type"
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
          options={[
            { value: 'Digital', label: 'Digital' },
            { value: 'Static', label: 'Static' }
          ]}
          required
        />

        <Input
          label="Size"
          value={formData.size}
          onChange={(e) => handleInputChange('size', e.target.value)}
          placeholder="e.g., 14x48"
          required
        />

        <Select
          label="Illumination"
          value={formData.illumination}
          onChange={(e) => handleInputChange('illumination', e.target.value)}
          options={[
            { value: 'LED', label: 'LED' },
            { value: 'None', label: 'None' }
          ]}
          required
        />

        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
            { value: 'Under Maintenance', label: 'Under Maintenance' }
          ]}
          required
        />

        <div className="flex space-x-4 mt-6">
          <Button type="submit">
            {initialData.id ? 'Update Billboard' : 'Create Billboard'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BillboardForm;