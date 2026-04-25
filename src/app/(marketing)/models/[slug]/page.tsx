import { notFound } from "next/navigation";
import { MODELS, MODALITY_LABELS } from "@/data/models";
import { ModelDetailClient } from "./client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MODELS.map((m) => ({ slug: encodeURIComponent(m.id) }));
}

export default async function ModelDetailPage({ params }: Props) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const model = MODELS.find((m) => m.id === decoded || m.id.endsWith("/" + decoded));
  if (!model) notFound();
  return <ModelDetailClient model={model} />;
}
