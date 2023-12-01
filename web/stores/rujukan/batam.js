import { defineStore } from 'pinia';
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';

export const useRujukanBatamStore = defineStore('rujukanBatam', () => {
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
    const res = await alovaInstance.Get('/api/rujukan/batam',  { headers }).send();
    this.items = res;

    return res;
  }

  async function create(body) {
    const res = await alovaInstance.Post('/api/rujukan/batam', body, { headers }).send();
    this.items.push(res);

    return res;
  }

  async function remove(body) {
    const res = await alovaInstance.Post('/api/rujukan/batam/remove', body, { headers }).send();
    await Promise.all(
      res.map((v1) => {
        const index = this.items.findIndex((v2) => v2._id === v1._id);
        this.items.splice(index, 1);
        return true;
      }),
    );

    return res;
  }

  async function update(body) {
    const res = await alovaInstance.Put(`/api/rujukan/batam/${body._id}`, body, { headers }).send();
    const index = this.items.findIndex((v) => v._id === res._id);
    Object.assign(this.items[index], res);

    return res;
  }

  return {
    items, getAll, create, remove, update
  };
});