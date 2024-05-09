export async function getData(
  path: string,
  params: object = {}
): Promise<unknown> {
  try {
    const response = await fetch(path, params);
    const data: unknown = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function postData(
  path: string,
  payload?: object
): Promise<unknown> {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data: unknown = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
