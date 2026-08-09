const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000';

async function fetchCMS<T>(path: string, params?: Record<string, string | number>): Promise<T | null> {
  try {
    const url = new URL(`${BASE_URL}/api/v1/cms${path}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          url.searchParams.set(k, String(v));
        }
      });
    }
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? json;
  } catch {
    return null;
  }
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  description?: string;
  long_description?: string;
  province?: string;
  category?: string;
  difficulty?: string;
  rating?: number | string;
  image?: string;
  bgImage?: string;
  cardImage?: string;
  gallery?: string | string[];
  highlights?: string | string[];
  why_visit?: string;
  tips?: string;
  best_season?: string;
  travel_time?: string;
}

export interface Experience {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  description?: string;
  short_description?: string;
  main_image?: string;
  image?: string;
  experience_type?: string;
  province?: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  engaging_description?: string;
  description?: string;
  main_image_url?: string;
  image?: string;
  duration_days: number;
  duration_nights?: number;
  base_price: number;
  currency?: string;
  best_for?: string[];
  categories?: { category?: { name?: string } }[];
  itinerary_days?: any[];
  accommodations?: any[];
  highlights?: string[];
}

export interface Event {
  id: string;
  slug: string;
  name: string;
  description?: string;
  venue?: string;
  start_date?: string;
  end_date?: string;
  main_image_url?: string;
  image?: string;
  tags?: string[];
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  author_name?: string;
  main_image_url?: string;
  image?: string;
  tags?: string[];
  published_at?: string;
  created_at?: string;
  content_data?: any[];
}

export interface CMSListResponse<T> {
  item: T[];
  total?: number;
}

export const getDestinations = (params?: Record<string, string | number>) =>
  fetchCMS<CMSListResponse<Destination>>('/destinations/', { page_size: 20, ...params });

export const getDestinationBySlug = async (slug: string) => {
  const res = await fetchCMS<any>(`/destinations/${slug}`);
  return res?.item ?? res;
};

export const getExperiences = (params?: Record<string, string | number>) =>
  fetchCMS<CMSListResponse<Experience>>('/experiences/', { page_size: 10, ...params });

export const getPackages = (params?: Record<string, string | number>) =>
  fetchCMS<CMSListResponse<Package>>('/packages/', { page_size: 20, ...params });

export const getPackageBySlug = async (slug: string) => {
  const res = await fetchCMS<any>(`/packages/${slug}`);
  return res?.item ?? res;
};

export const getPackageCategories = () =>
  fetchCMS<{ item: any[] }>('/packages/categories/');

export const getEvents = (params?: Record<string, string | number>) =>
  fetchCMS<CMSListResponse<Event>>('/events/', { page_size: 6, ...params });

export const getBlogs = (params?: Record<string, string | number>) =>
  fetchCMS<CMSListResponse<Blog>>('/blogs/', { page_size: 10, ...params });

export const getBlogBySlug = async (slug: string) => {
  const res = await fetchCMS<any>(`/blogs/${slug}`);
  return res?.item ?? res;
};

export const cmsApi = {
  getDestinations,
  getDestinationBySlug,
  getExperiences,
  getPackages,
  getPackageBySlug,
  getPackageCategories,
  getEvents,
  getBlogs,
  getBlogBySlug,
};
