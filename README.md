# Free Resource

This project, **Free Resource**, is built using the latest **Next.js 14.2.14** with TypeScript and TailwindCSS.

### Installation

1. Create a `.env` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_DATABASE_URL=your_postgresql_connection_string
NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT=your_cloudflare_r2_endpoint
NEXT_PUBLIC_CLOUDFLARE_R2_REGION=your_cloudflare_r2_region
NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID=your_cloudflare_access_key_id
NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY=your_cloudflare_secret_access_key
NEXT_PUBLIC_CLOUDFLARE_PUBLIC_BUCKET_URL=your_cloudflare_public_bucket_url
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
```

2. Update the environment variables according to your setup:

- **NEXT_PUBLIC_DATABASE_URL**: Your PostgreSQL connection string (e.g., from Supabase or your PostgreSQL server)
- **NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT**: Cloudflare R2 endpoint for file storage
- **NEXT_PUBLIC_CLOUDFLARE_R2_REGION**: Cloudflare region for R2 storage
- **NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID**: Your Cloudflare access key ID
- **NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY**: Your Cloudflare secret access key
- **NEXT_PUBLIC_CLOUDFLARE_PUBLIC_BUCKET_URL**: Cloudflare R2 public bucket URL for serving files
- **NEXT_PUBLIC_API_BASE_URL**: The base URL for your API (e.g., `http://localhost:3000` for local development)

3. Cloudflare R2 setup:

Bucket name: `tree-shop`
