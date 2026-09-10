import { WorkflowLifecycleSchema } from "beast-contracts/orchestration";
import { publishEvent } from "../data/EventPublisher";

export class WorkflowSupervisor {
  supervise(lifecyclePacket) {
    const valid = WorkflowLifecycleSchema.safeParse(lifecyclePacket);
    if (!valid.success) throw new Error("Invalid workflow lifecycle packet");

    const { workflow, phase, context } = valid.data;

    const supervised = {
      id: crypto.randomUUID(),
      workflow: workflow.workflow,
      phase,
      context,
      supervisedAt: new Date().toISOString()
    };

    publishEvent("orch.workflow.supervised", supervised);
    return supervised;
  }
}
