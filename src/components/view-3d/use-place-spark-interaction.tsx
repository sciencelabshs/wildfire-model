import { ftToViewUnit } from "./helpers";
import { Interaction } from "../../models/ui";
import { useStores } from "../../use-stores";
import { PointerEvent } from "react-three-fiber/canvas";
import { log } from "@concord-consortium/lara-interactive-api";

export const usePlaceSparkInteraction = () => {
  const { simulation, ui } = useStores();
  return {
    active: ui.interaction === Interaction.PlaceSpark,
    onPointerDown: (e: PointerEvent) => {
      const ratio = ftToViewUnit(simulation);
      const x = e.point.x / ratio;
      const y = e.point.y / ratio;
      simulation.addSpark(x, y);
      ui.interaction = null;
      log("SparkPlaced", { x: x / simulation.config.modelWidth, y: y / simulation.config.modelHeight });
    }
  };
};
