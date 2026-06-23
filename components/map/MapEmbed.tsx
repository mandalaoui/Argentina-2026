export default function MapEmbed() {
  const src = process.env.NEXT_PUBLIC_MAPS_EMBED_URL;

  if (!src) {
    return (
      <div className="flex h-full items-center justify-center bg-argentina-light p-4 text-center">
        <p className="text-navy">המפה לא זמינה — חסרה כתובת הטמעה בהגדרות.</p>
      </div>
    );
  }

  return (
    <iframe
      src={src}
      title="מפת הטיול"
      className="h-full w-full border-0"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
