import { ref } from 'vue';

export default function useFetch(url) {
  const data = ref(null);
  const pending = ref(true);
  const error = ref(null);

  fetch(url)
    .then(response => response.json())
    .then(json => {
      data.value = json;
      pending.value = false;
    })
    .catch(err => {
      error.value = err;
      pending.value = false;
    });

  return { data, pending, error };
}
