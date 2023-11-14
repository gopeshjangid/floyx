import type { Metadata } from 'next'

export const getMetaData = (values: Metadata):  Metadata =>  ({
 ...values,
});