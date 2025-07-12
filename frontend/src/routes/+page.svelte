<script>
  import { onMount } from 'svelte';
  let query = '';
  let results = [];
  let error = '';

  const search = async () => {
    if (!query) return;
    error = '';
    results = [];
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Search failed');
      results = await res.json();
    } catch (err) {
      error = err.message;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };
</script>

<main class="p-8 max-w-3xl mx-auto">
  <form on:submit={handleSubmit} class="mb-4">
    <input
      type="text"
      bind:value={query}
      placeholder="Search the web... (!gh rust-lang)"
      class="w-full p-3 text-lg rounded border border-gray-300 shadow"
    />
    <button class="mt-2 px-4 py-2 bg-blue-600 text-white rounded shadow">Search</button>
  </form>

  {#if error}
    <p class="text-red-600">{error}</p>
  {/if}

  {#if results.length}
    <ul class="space-y-4">
      {#each results as result}
        <li>
          <a href={result.url} class="text-blue-700 underline font-semibold" target="_blank">{result.title}</a>
          <p class="text-sm text-gray-600">{result.url}</p>
          <p>{result.snippet}</p>
        </li>
      {/each}
    </ul>
  {/if}
</main>