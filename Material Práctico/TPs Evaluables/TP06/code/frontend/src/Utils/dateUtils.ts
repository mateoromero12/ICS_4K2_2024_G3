export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "No disponible";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };