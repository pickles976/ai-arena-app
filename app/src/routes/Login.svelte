<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from '../supabaseClient'
  import type { AuthSession } from '@supabase/supabase-js'
  import Account from '../components/login/Account.svelte'
  import Auth from '../components/login/Login.svelte'
  import { auth } from '../stores';

  // let session: AuthSession

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      $auth.session = data.session
    })

    supabase.auth.onAuthStateChange((_event, _session) => {
      $auth.session = _session
    })
  })
</script>

<div class="container" style="padding: 50px 0 100px 0">
  {#if !$auth.session}
  <Auth />
  {:else}
  <Account bind:session={$auth.session} />
  {/if}
</div>