using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace PlannerAI
{
    class Program
    {
        const int Port = 5173;
        const string ProjectDir = @"C:\Users\Admin\.gemini\antigravity\scratch\companion-tracker";
        const string TargetUrl = "http://localhost:5173";

        static bool IsPortListening(int port)
        {
            // Try IPv6 loopback first (Vite often binds to ::1)
            try
            {
                using (var client = new TcpClient(AddressFamily.InterNetworkV6))
                {
                    var result = client.BeginConnect(IPAddress.IPv6Loopback, port, null, null);
                    if (result.AsyncWaitHandle.WaitOne(200, false) && client.Connected)
                    {
                        client.EndConnect(result);
                        return true;
                    }
                }
            }
            catch { }

            // Try IPv4 127.0.0.1
            try
            {
                using (var client = new TcpClient())
                {
                    var result = client.BeginConnect(IPAddress.Loopback, port, null, null);
                    if (result.AsyncWaitHandle.WaitOne(200, false) && client.Connected)
                    {
                        client.EndConnect(result);
                        return true;
                    }
                }
            }
            catch { }

            // Try localhost
            try
            {
                using (var client = new TcpClient())
                {
                    var result = client.BeginConnect("localhost", port, null, null);
                    if (result.AsyncWaitHandle.WaitOne(200, false) && client.Connected)
                    {
                        client.EndConnect(result);
                        return true;
                    }
                }
            }
            catch { }

            return false;
        }

        [STAThread]
        static void Main(string[] args)
        {
            try
            {
                bool running = IsPortListening(Port);

                if (!running)
                {
                    // Start npm run dev hidden in background
                    var serverStart = new ProcessStartInfo
                    {
                        FileName = "cmd.exe",
                        Arguments = "/c npm run dev",
                        WorkingDirectory = ProjectDir,
                        CreateNoWindow = true,
                        WindowStyle = ProcessWindowStyle.Hidden,
                        UseShellExecute = false
                    };
                    Process.Start(serverStart);

                    // Wait until server is listening
                    for (int i = 0; i < 100; i++)
                    {
                        Thread.Sleep(150);
                        if (IsPortListening(Port))
                        {
                            Thread.Sleep(300);
                            break;
                        }
                    }
                }

                // Locate Google Chrome
                string chromePath = @"C:\Program Files\Google\Chrome\Application\chrome.exe";
                if (!File.Exists(chromePath))
                {
                    chromePath = @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";
                }
                if (!File.Exists(chromePath))
                {
                    string localApp = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
                    chromePath = Path.Combine(localApp, @"Google\Chrome\Application\chrome.exe");
                }

                if (File.Exists(chromePath))
                {
                    var chromePsi = new ProcessStartInfo
                    {
                        FileName = chromePath,
                        Arguments = TargetUrl,
                        UseShellExecute = true
                    };
                    Process.Start(chromePsi);
                }
                else
                {
                    var fallbackPsi = new ProcessStartInfo
                    {
                        FileName = TargetUrl,
                        UseShellExecute = true
                    };
                    Process.Start(fallbackPsi);
                }
            }
            catch (Exception)
            {
                // Fallback to opening default browser
                try
                {
                    Process.Start(new ProcessStartInfo(TargetUrl) { UseShellExecute = true });
                }
                catch { }
            }
        }
    }
}
