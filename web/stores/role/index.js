import { defineStore } from 'pinia';
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';

export const useRoleStore = defineStore('role', () => {
  const config = useRuntimeConfig();

  const { token } = useAuth();
  const headers = {
    Authorization: token.value,
    'Content-Type': 'application/json;charset=UTF-8',
  };

  const alovaInstance = createAlova({
    baseURL: config.public.apiUrl,
    requestAdapter: GlobalFetch(),
    responded: {
      onSuccess: async (response) => {
        const json = await response.json();  
        if (response.status !== 200) throw new Error(json.message);
        return json;
      },
    },
  });

  const items = ref([]);

  async function getAll() {
    const res = await alovaInstance.Get('/api/role',  { headers }).send();
    this.items = res;
    return res;
  }

  async function create(body) {
    const res = await alovaInstance.Post('/api/role', body, { headers }).send();
    this.items.push(res);

    return res;
  }

  return {
    items, getAll, create
  };
});