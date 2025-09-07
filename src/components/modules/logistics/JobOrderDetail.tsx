import React from 'react';
import Link from 'next/link';
import jobOrdersData from '@/data/jobOrders.json'; // Mock data
import billboardsData from '@/data/billboards.json'; // To get billboard details

interface JobOrder {
  id: string;
  billboard_id: string;
  type: string; // e.g., 'Installation', 'Removal', 'Maintenance', 'Creative Change'
  description: string;
  assigned_team: string;
  priority: string;
  status: string; // e.g., 'Pending', 'In Progress', 'Completed'
  created_date: string;
  due_date: string;
  materials?: Array<{ item: string; quantity: number }>;
  proof_of_performance?: Array<{ date: string; photo_url: string; notes: string }>;
}

interface JobOrderDetailProps {
  jobOrderId: string;
}

const JobOrderDetail: React.FC<JobOrderDetailProps> = ({ jobOrderId }) => {
  const jobOrder = (jobOrdersData as JobOrder[]).find(j => j.id === jobOrderId);

  if (!jobOrder) {
    return <p className="text-red-500">Job Order not found.</p>;
  }

  const billboard = billboardsData.find(b => b.id === jobOrder.billboard_id);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Job Order: {jobOrder.description}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p><strong>Job Order ID:</strong> {jobOrder.id}</p>
          <p><strong>Billboard:</strong> {billboard ? billboard.location.address : jobOrder.billboard_id} (<Link href={`/inventory/${jobOrder.billboard_id}`} className="text-blue-500 hover:underline">{jobOrder.billboard_id}</Link>)</p>
          <p><strong>Type:</strong> {jobOrder.type}</p>
          <p><strong>Description:</strong> {jobOrder.description}</p>
          <p><strong>Assigned Team:</strong> {jobOrder.assigned_team}</p>
          <p><strong>Priority:</strong> {jobOrder.priority}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${jobOrder.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{jobOrder.status}</span></p>
          <p><strong>Created Date:</strong> {jobOrder.created_date}</p>
          <p><strong>Due Date:</strong> {jobOrder.due_date}</p>
        </div>
        <div>
          {jobOrder.materials && jobOrder.materials.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Materials Required</h3>
              <ul>
                {jobOrder.materials.map((material, index) => (
                  <li key={index}>{material.item}: {material.quantity}</li>
                ))}
              </ul>
            </div>
          )}

          {jobOrder.proof_of_performance && jobOrder.proof_of_performance.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Proof of Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                {jobOrder.proof_of_performance.map((proof, index) => (
                  <div key={index} className="border p-2 rounded-md">
                    <p>{proof.date}: {proof.notes}</p>
                    {proof.photo_url && (
                      <img src={proof.photo_url} alt={`Proof ${index + 1}`} className="mt-2 max-w-full h-auto rounded-md" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Update Status
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Mark as Completed
        </button>
      </div>
    </div>
  );
};

export default JobOrderDetail;