import { useState, useEffect } from 'react';
import { PortfolioData } from '../types/portfolio';
import { getStoredPortfolioData, savePortfolioData, resetPortfolioData } from '../data/portfolioData';

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(getStoredPortfolioData);

  useEffect(() => {
    const handleUpdate = () => {
      setData(getStoredPortfolioData());
    };

    window.addEventListener('portfolio-data-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('portfolio-data-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateData = (newData: PortfolioData) => {
    savePortfolioData(newData);
    setData(newData);
  };

  const updateResume = (url: string, fileName: string) => {
    const updated = {
      ...data,
      profile: {
        ...data.profile,
        resumeUrl: url,
        resumeName: fileName,
        resumeUpdatedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      }
    };
    updateData(updated);
  };

  const resetData = () => {
    resetPortfolioData();
    setData(getStoredPortfolioData());
  };

  return {
    data,
    updateData,
    updateResume,
    resetData
  };
}
