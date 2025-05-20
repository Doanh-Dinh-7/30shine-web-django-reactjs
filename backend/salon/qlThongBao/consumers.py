from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ThongBaoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("thongbao", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("thongbao", self.channel_name)

    async def send_thongbao(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({'message': message}))

