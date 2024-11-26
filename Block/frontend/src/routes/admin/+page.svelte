<script>
    let studentName = '';
    let certificateDetails = '';

    async function issueCertificate() {
        // Aquí conectas Firebase Firestore para registrar el certificado
        certificateDetails = `Certificado creado para: ${studentName}`;
    }
</script>

<div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Panel de Administración</h1>
    <input
        type="text"
        bind:value={studentName}
        placeholder="Nombre del Estudiante"
        class="w-full p-2 border rounded mb-4"
    />
    <button
        on:click={issueCertificate}
        class="bg-blue-500 text-white px-4 py-2 rounded"
    >
        Crear Certificado
    </button>

    {#if certificateDetails}
        <p class="mt-4 text-green-500">{certificateDetails}</p>
    {/if}
</div>

