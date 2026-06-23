# Assets Folder — Argentina 2026 Hub

Drop your files into the correct subfolder. These will be uploaded to Supabase Storage before launch.

## Folder Structure

```
assets/
├── flights/        ← Flight ticket PDFs, boarding passes, QR codes
├── insurance/      ← Travel insurance policy PDF
├── passports/      ← Passport scans / photos (JPG or PDF)
├── hotels/         ← Booking confirmation PDFs
└── documents/      ← Anything else (misc important docs)
```

## Naming Convention

Use clear, simple filenames:

| Example filename | What it is |
|---|---|
| `flight-tlv-eze.pdf` | TLV → Buenos Aires flight |
| `flight-bue-brc.pdf` | Buenos Aires → Bariloche internal flight |
| `flight-brc-bue.pdf` | Bariloche → Buenos Aires internal flight |
| `flight-eze-tlv.pdf` | Return flight to Israel |
| `insurance-policy.pdf` | Travel insurance document |
| `passport-[name].jpg` | Passport scan |
| `hotel-buenos-aires.pdf` | Buenos Aires hotel booking |
| `hotel-bariloche.pdf` | Bariloche hotel booking |

## Important

- Do NOT commit this folder to Git (it is in .gitignore)
- Files here are for local reference and Supabase upload only
- Keep originals safe — this is just a working copy
