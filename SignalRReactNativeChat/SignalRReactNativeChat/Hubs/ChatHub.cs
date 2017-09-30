using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRReactNativeChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task Send(string message)
        {
            await Clients.All.InvokeAsync("Send", message);
        }
    }
}
