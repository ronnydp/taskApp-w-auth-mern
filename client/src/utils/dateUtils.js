export const getRelativeDateText = (
  today,
  dueDate,
  diff,
  taskUpdated,
  taskCompleted
) => {
  if (taskCompleted) {
    return `Completado: ${taskUpdated.format("ddd DD MMM")}`;
  }
  if (diff === 0) return "Hoy";
  if (diff === -1) return "Ayer";
  if (diff === 1) return "Mañana";
  if (diff < -1 && diff > -7) return `Hace ${Math.abs(diff)} días`;
  if (diff <= -7) {
    const weeks = Math.floor(Math.abs(diff) / 7);
    return `Hace ${weeks} semana${weeks > 1 ? "s" : ""}`;
  }
  dueDate.from(today);
};