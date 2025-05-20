from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def send_notification(noi_dung):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "thongbao",  # group name
        {
            "type": "send_thongbao",
            "message": noi_dung,
        }
    )

