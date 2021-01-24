# 🛴 킥보드 SDK

하이킥 킥보드를 위한 SDK 입니다.

```typescript
async function main() {
  /* RabbitMQ 서비스 등록 */
  const service = new KickboardService({
    hostname: 'localhost',
    username: 'guest',
    password: 'guest',
    vhost: '/',
  });

  /* M2 이벤트 리스너 */
  service.on(
    'mt2',
    (kickboard: KickboardClient, packet: Packet, done: () => void) => {
      /* 이벤트에 대한 처리를 진행합니다. */
      console.log(`Current Location - X: ${latitude}, Y: ${longitude}`);
      done();
    }
  );

  /* 서비스 연결 */
  await service.connect();

  /** 특정 킥보드 제어 */
  const kickboard = new KickboardClient(service, 'KICKBOARD ID');
  await kickboard.start();
  await kickboard.lightOn(0);
  kickboard.batteryLock();

  /* 위치 정보 가져오기 */
  const status = await kickboard.getConfigM2();

  const { latitude, longitude } = status;
  console.log(`Current Location - X: ${latitude}, Y: ${longitude}`);

  /* 특정 킥보드에 대한 이벤트 등록 */
  const subscribe = await kickboard.createSubscribe();
  subscribe.on('mt2', (packet: PacketMT2) => {
    const { latitude, longitude } = packet;
    console.log(`Updated Location - X: ${latitude}, Y: ${longitude}`);

    /* 운행이 종료되었을 때 정보 이벤트 해제 */
    if (!packet.vehicle?.isEnabled) {
      kickboard.stopSubscribe(subscribe);
    }
  });

  /* 특정 킥보드에 대한 이벤트 시작*/
  await kickboard.startSubscribe(subscribe);
}

main();
```
