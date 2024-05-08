<script>
    import { loadStripe } from '@stripe/stripe-js'
    import { Elements,  PaymentElement } from 'svelte-stripe'
    import { onMount } from 'svelte'
    import { PUBLIC_STRIPE_KEY } from '$env/static/public'
  
    let stripe = null
    let clientSecret = ''
    let elements
  
    onMount(async () => {
      stripe = await loadStripe(PUBLIC_STRIPE_KEY)
      const response = await fetch('http://localhost:3100/stripe', {
            method: 'POST'
        })
        const result = await response.json()
        clientSecret = result.client_secret // クイックスタートの場合、「result.clientSecret」
    })
</script>
  
{#if stripe && clientSecret}
      <Elements {stripe} {clientSecret} bind:elements>
        <PaymentElement />
      </Elements>
{/if}