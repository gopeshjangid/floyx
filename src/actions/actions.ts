'use server';
import { revalidatePath } from 'next/cache';

export async function revalidateArticleDetail(pathname) {
  revalidatePath(pathname);
}
