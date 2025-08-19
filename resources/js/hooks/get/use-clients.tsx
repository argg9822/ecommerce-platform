import { useState, useEffect } from "react";
import axios from "axios";
import { Client } from "@/types/client";

export default function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loadingClients, setLoadingClients] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
      setLoadingClients(true)
      setError(null)

      axios.get(route('user_index'))
        .then(res => setClients(res.data.clients))
        .catch(err => setError(err.message))
        .finally(() => setLoadingClients(false))
  }, []);

  return { clients, loadingClients, error }
}
