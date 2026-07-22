import type { ExpeditionDefinition, ExpeditionStatus } from "./types";

const VALID_STATUSES: ExpeditionStatus[] = ["active", "recommended", "available", "completed"];

export function validateExpeditionCatalogue(catalogue: ExpeditionDefinition[]) {
  const errors: string[] = [];
  const slugs = new Set<string>();

  for (const expedition of catalogue) {
    if (slugs.has(expedition.slug)) errors.push(`Duplicate expedition slug: ${expedition.slug}`);
    slugs.add(expedition.slug);
    if (!VALID_STATUSES.includes(expedition.status)) errors.push(`${expedition.slug}: invalid status`);
    if (!expedition.introduction.trim()) errors.push(`${expedition.slug}: empty introduction`);

    const checkpointIds = new Set<string>();
    let priorDistance = -1;
    let starts = 0;
    let finishes = 0;
    for (const checkpoint of expedition.checkpoints) {
      if (checkpointIds.has(checkpoint.id)) errors.push(`${expedition.slug}: duplicate checkpoint ${checkpoint.id}`);
      checkpointIds.add(checkpoint.id);
      if (checkpoint.distanceMeters < priorDistance) errors.push(`${expedition.slug}: checkpoint distances are not sequential`);
      if (checkpoint.distanceMeters > expedition.totalDistanceMeters) errors.push(`${expedition.slug}: ${checkpoint.id} exceeds route total`);
      if (!checkpoint.story.trim() || !checkpoint.context.trim()) errors.push(`${expedition.slug}: ${checkpoint.id} has empty narrative`);
      if (checkpoint.type === "start") starts += 1;
      if (checkpoint.type === "finish") finishes += 1;
      priorDistance = checkpoint.distanceMeters;
    }
    if (starts !== 1 || finishes !== 1) errors.push(`${expedition.slug}: expected one start and one finish`);
    if (expedition.checkpoints[0]?.distanceMeters !== 0) errors.push(`${expedition.slug}: start must be at zero`);
    if (expedition.checkpoints.at(-1)?.distanceMeters !== expedition.totalDistanceMeters) errors.push(`${expedition.slug}: finish must equal route total`);
  }

  return errors;
}
