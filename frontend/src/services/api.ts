const BASE_URL = "http://127.0.0.1:3000";

export async function getInventory() {
  const res = await fetch(`${BASE_URL}/inventory`);
  return res.json();
}

export async function getAlerts() {
  const res = await fetch(`${BASE_URL}/inventory/alerts`);
  return res.json();
}

export async function addItem(name: string, quantity: number, expiry: string) {
  const res = await fetch(`${BASE_URL}/inventory/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, quantity, expiry }),
  });
  return res.json();
}
