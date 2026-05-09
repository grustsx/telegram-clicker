import { useState } from 'react';

export function useSelectedBuilding() {
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(
    null,
  );

  return {
    selectedBuildingId,
    selectBuilding: setSelectedBuildingId,
    clearSelectedBuilding: () => setSelectedBuildingId(null),
  };
}
