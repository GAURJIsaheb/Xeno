"use client";
import React, { useEffect, useState } from 'react';

const CampaignDetails = () => {
  const [campaignData, setCampaignData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/HistoryCampaign')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch campaign data');
        }
        return res.json();
      })
      .then((data) => {
        setCampaignData(data); // Store all campaigns
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading campaign details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">All Campaigns</h1>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {campaignData.map((campaign, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Campaign #{index + 1}</h2>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="font-semibold">Campaign Name:</span>
                <span>{campaign.name}</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="font-semibold">Message:</span>
                <span>{campaign.message}</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="font-semibold">Status:</span>
                <span className={`${
                  campaign.status === "Scheduled" ? "text-yellow-400" : "text-green-400"
                }`}>{campaign.status}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 border-b border-gray-700 pb-2">
                <div>
                  <span className="font-semibold">Sent:</span>
                  <span> {campaign.sent}</span>
                </div>
                <div>
                  <span className="font-semibold">Opened:</span>
                  <span> {campaign.opened}</span>
                </div>
                <div>
                  <span className="font-semibold">Clicked:</span>
                  <span> {campaign.clicked}</span>
                </div>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="font-semibold">Scheduled Date:</span>
                <span>{campaign.scheduledDate ? new Date(campaign.scheduledDate).toLocaleString() : 'N/A'}</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="font-semibold">Tags:</span>
                <span>{campaign.tags?.join(", ")}</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="font-semibold">Snapshot Date:</span>
                <span>{campaign.snapshotDate ? new Date(campaign.snapshotDate).toLocaleString() : 'N/A'}</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="font-semibold">Created At:</span>
                <span>{new Date(campaign.createdAt).toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Updated At:</span>
                <span>{new Date(campaign.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignDetails;
