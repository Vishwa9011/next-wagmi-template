'use client';

import type { Abi } from 'viem';
import { wagmiConfig } from '../config';
import { tokenABI } from '../abis/token';
import useNetworkData from './useNetworkData';
import { handleError } from '@/lib/utils/errors';
import { useReadContract, useWriteContract } from 'wagmi';
import type { Config, UseReadContractParameters, UseWriteContractParameters } from 'wagmi';

type UseTokenReadParameters = Omit<UseReadContractParameters, 'abi' | 'address' | 'functionName' | 'args'>;

export function useTokenRead<T = unknown>(
  functionName: string,
  args: Array<any> = [],
  options?: UseTokenReadParameters,
) {
  const { token } = useNetworkData();
  return useReadContract<Abi, string, Array<any>, Config, T>({
    abi: tokenABI as Abi,
    address: token,
    functionName: functionName,
    args,
    query: {} as any,
    ...options,
  });
}

type useTokenWriteParameters = Pick<UseWriteContractParameters, 'mutation'>['mutation'];

export function useTokenWrite(functionName: string, options?: useTokenWriteParameters) {
  const { token } = useNetworkData();
  const { writeContractAsync, writeContract, ...rest } = useWriteContract({
    config: wagmiConfig,
    mutation: {
      onError: (error) => {
        handleError(error);
      },
      onSettled: (data) => {
        console.log(data);
      },
      ...options,
    },
  });

  const write = async (args: Array<any> = []) => {
    await writeContractAsync({
      abi: tokenABI as Abi,
      address: token,
      args,
      functionName,
    });
  };
  return { write, ...rest };
}
