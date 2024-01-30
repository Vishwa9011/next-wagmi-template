'use client';

import { useAccount } from 'wagmi';
import { getNetwork } from '../networks/network';
import { Network } from '@/lib/types/network';

const useNetworkData = (): Network => {
  const { chainId } = useAccount();
  const networkData = getNetwork(chainId);
  return networkData as Network;
};

export default useNetworkData;
