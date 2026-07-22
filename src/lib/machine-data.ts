export type MachineClass = "Air resistance" | "Dynamic" | "Water resistance" | "Electromagnetic" | "Bluetooth FTMS" | "Other";

export interface MachineModel {
  id: string;
  provider: string;
  model: string;
  machineClass: MachineClass;
}

/** Prototype catalog for attribution only; inclusion does not imply an integration or partnership. */
export const MACHINE_MODELS: MachineModel[] = [
  { id: "concept2-rowerg", provider: "Concept2", model: "RowErg", machineClass: "Air resistance" },
  { id: "concept2-model-d", provider: "Concept2", model: "Model D", machineClass: "Air resistance" },
  { id: "concept2-model-e", provider: "Concept2", model: "Model E", machineClass: "Air resistance" },
  { id: "concept2-dynamic", provider: "Concept2", model: "Dynamic Indoor Rower", machineClass: "Dynamic" },
  { id: "rp3-model-s", provider: "RP3", model: "Model S", machineClass: "Dynamic" },
  { id: "rp3-model-t", provider: "RP3", model: "Model T", machineClass: "Dynamic" },
  { id: "waterrower-original", provider: "WaterRower", model: "Original Series", machineClass: "Water resistance" },
  { id: "waterrower-performance", provider: "WaterRower", model: "Performance Ergometer", machineClass: "Water resistance" },
  { id: "technogym-skillrow", provider: "Technogym", model: "Skillrow", machineClass: "Electromagnetic" },
  { id: "matrix-rower", provider: "Matrix", model: "Rower", machineClass: "Electromagnetic" },
  { id: "bluetooth-ftms", provider: "Bluetooth", model: "FTMS-compatible rower", machineClass: "Bluetooth FTMS" },
];

export function getMachineModel(id: string) {
  return MACHINE_MODELS.find((machine) => machine.id === id);
}

export function machineDisplayName(machine: Pick<MachineModel, "provider" | "model">) {
  return `${machine.provider} ${machine.model}`;
}
