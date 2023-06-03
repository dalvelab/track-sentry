async function getServiceResponse(config, name, res) {
  const service = config.services.find((service) => service.name === name);
  
  if (!service) {
    res.status(404);
    res.json({
      error: `No service find with name ${name}`
    })
  }

  try {
    const response = await fetch(service.url);

    const data = await response.json()

    res.status(200);
    res.send(data);
  } catch (error) {
    res.status(404);
    res.json({
      message: `Something wrong with request to ${service.url}`,
      error
    })
    return;
  }

  if (!process.env.TELEGRAM_BOT_TOKEN) {
    res.status(400);
    res.json({
      message: 'Add TELEGRAM_BOT_TOKEN variable to .env file',
    })
  }

  // SEND MESSAGE TO TELEGRAM
  try {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    
    const body = {
      chat_id: 343606892,
      text: "Сервис доступен"
    }

    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    await response.json();
  } catch (error) {
    res.status(400);
    res.json({
      message: 'Cannot send data to Telegram',
      error
    })
  } 
}

module.exports = getServiceResponse;