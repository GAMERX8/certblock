<script>
    let certificateID = '';
    let certificateDetails = '';

    async function verifyCertificate() {
        // Aquí conectas Firebase Firestore para verificar el certificado
        certificateDetails = `Detalles del certificado para ID: ${certificateID}`;
    }
</script>

<div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Verificar Certificado</h1>
    <input
        type="text"
        bind:value={certificateID}
        placeholder="ID del Certificado"
        class="w-full p-2 border rounded mb-4"
    />
    <button
        on:click={verifyCertificate}
        class="bg-green-500 text-white px-4 py-2 rounded"
    >
        Verificar
    </button>

    {#if certificateDetails}
        <p class="mt-4 text-blue-500">{certificateDetails}</p>
    {/if}
</div>
