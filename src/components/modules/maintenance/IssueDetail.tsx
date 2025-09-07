import React from 'react';
import Link from 'next/link';
import jobOrdersData from '@/data/jobOrders.json'; // Mock data for job orders (issues)
import billboardsData from '@/data/billboards.json'; // To get billboard details

interface Issue {
  id: string;
  billboard_id: string;
  type: string; // e.g., 'Damage', 'Power Outage', 'Software Glitch'
  description: string;
  assigned_team: string;
  priority: string;
  status: string; // e.g., 'Reported', 'Investigating', 'Resolved'
  created_date: string;
  due_date: string;
  materials?: Array<{ item: string; quantity: number }>;
  proof_of_performance?: Array<{ date: string; photo_url: string; notes: string }>;
}

interface IssueDetailProps {
  issueId: string;
}

const IssueDetail: React.FC<IssueDetailProps> = ({ issueId }) => {
  const issue = (jobOrdersData as Issue[]).find(j => j.id === issueId);

  if (!issue) {
    return <p className="text-red-500">Issue not found.</p>;
  }

  const billboard = billboardsData.find(b => b.id === issue.billboard_id);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Issue: {issue.description}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p><strong>Issue ID:</strong> {issue.id}</p>
          <p><strong>Billboard:</strong> {billboard ? billboard.location.address : issue.billboard_id} (<Link href={`/inventory/${issue.billboard_id}`} className="text-blue-500 hover:underline">{issue.billboard_id}</Link>)</p>
          <p><strong>Type:</strong> {issue.type}</p>
          <p><strong>Description:</strong> {issue.description}</p>
          <p><strong>Assigned Team:</strong> {issue.assigned_team}</p>
          <p><strong>Priority:</strong> {issue.priority}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${issue.status === 'Resolved' ? 'text-green-600' : 'text-yellow-600'}`}>{issue.status}</span></p>
          <p><strong>Reported Date:</strong> {issue.created_date}</p>
          <p><strong>Due Date:</strong> {issue.due_date}</p>
        </div>
        <div>
          {issue.materials && issue.materials.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Materials Used</h3>
              <ul>
                {issue.materials.map((material, index) => (
                  <li key={index}>{material.item}: {material.quantity}</li>
                ))}
              </ul>
            </div>
          )}

          {issue.proof_of_performance && issue.proof_of_performance.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Proof of Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                {issue.proof_of_performance.map((proof, index) => (
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
          Mark as Resolved
        </button>
      </div>
    </div>
  );
};

export default IssueDetail;