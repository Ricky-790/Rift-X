
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';

const WalletConnectPage = () => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [activeWallet, setActiveWallet] = useState('');

  const walletOptions = [
    { 
      id: 'metamask', 
      name: 'MetaMask', 
      description: 'Connect to your MetaMask wallet',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.2684 4L17.9559 11.0075L19.5423 6.63996L27.2684 4Z" fill="#E17726"/>
          <path d="M4.73169 4L13.9579 11.0673L12.4577 6.63996L4.73169 4Z" fill="#E27625"/>
          <path d="M23.9364 21.7868L21.2783 26.1175L26.7821 27.6953L28.4345 21.883L23.9364 21.7868Z" fill="#E27625"/>
          <path d="M3.57593 21.883L5.2179 27.6953L10.7113 26.1175L8.06373 21.7868L3.57593 21.883Z" fill="#E27625"/>
          <path d="M10.4234 14.7533L9.08386 17.2973L14.519 17.5885L14.3167 11.7417L10.4234 14.7533Z" fill="#E27625"/>
          <path d="M21.5766 14.7533L17.633 11.6818L17.4811 17.5885L22.9162 17.2973L21.5766 14.7533Z" fill="#E27625"/>
          <path d="M10.7113 26.1175L14.1708 24.4189L11.1992 21.9247L10.7113 26.1175Z" fill="#E27625"/>
          <path d="M17.8291 24.4189L21.2783 26.1175L20.8008 21.9247L17.8291 24.4189Z" fill="#E27625"/>
          <path d="M21.2783 26.1175L17.8291 24.4189L18.1203 26.7548L18.0901 27.5956L21.2783 26.1175Z" fill="#D5BFB2"/>
          <path d="M10.7113 26.1175L13.9099 27.5956L13.8896 26.7548L14.1708 24.4189L10.7113 26.1175Z" fill="#D5BFB2"/>
          <path d="M13.9703 20.2663L11.1387 19.3654L13.1052 18.3757L13.9703 20.2663Z" fill="#233447"/>
          <path d="M18.0297 20.2663L18.8948 18.3757L20.8714 19.3654L18.0297 20.2663Z" fill="#233447"/>
          <path d="M10.7113 26.1175L11.2196 21.7868L8.06372 21.883L10.7113 26.1175Z" fill="#CC6228"/>
          <path d="M20.7804 21.7868L21.2783 26.1175L23.9364 21.883L20.7804 21.7868Z" fill="#CC6228"/>
          <path d="M22.9162 17.2973L17.4811 17.5885L18.0297 20.2663L18.8948 18.3757L20.8714 19.3654L22.9162 17.2973Z" fill="#CC6228"/>
          <path d="M11.1387 19.3654L13.1052 18.3757L13.9703 20.2663L14.519 17.5885L9.08386 17.2973L11.1387 19.3654Z" fill="#CC6228"/>
          <path d="M9.08386 17.2973L11.1992 21.9247L11.1387 19.3654L9.08386 17.2973Z" fill="#E27525"/>
          <path d="M20.8714 19.3654L20.8008 21.9247L22.9162 17.2973L20.8714 19.3654Z" fill="#E27525"/>
          <path d="M14.519 17.5885L13.9703 20.2663L14.6708 23.278L14.8428 18.6521L14.519 17.5885Z" fill="#E27525"/>
          <path d="M17.4811 17.5885L17.1675 18.6419L17.3292 23.278L18.0297 20.2663L17.4811 17.5885Z" fill="#E27525"/>
          <path d="M18.0297 20.2663L17.3292 23.278L17.8291 24.4189L20.8008 21.9247L20.8714 19.3654L18.0297 20.2663Z" fill="#F5841F"/>
          <path d="M11.1387 19.3654L11.1992 21.9247L14.1708 24.4189L14.6708 23.278L13.9703 20.2663L11.1387 19.3654Z" fill="#F5841F"/>
          <path d="M18.0901 27.5956L18.1203 26.7548L17.8493 26.5227H14.1507L13.8896 26.7548L13.9099 27.5956L10.7113 26.1175L11.8355 27.0483L14.1203 28.6L17.8694 28.6L20.1645 27.0483L21.2783 26.1175L18.0901 27.5956Z" fill="#C0AC9D"/>
          <path d="M17.8291 24.4189L17.3292 23.278H14.6708L14.1708 24.4189L13.8896 26.7548L14.1507 26.5227H17.8493L18.1203 26.7548L17.8291 24.4189Z" fill="#161616"/>
          <path d="M27.7664 12.0747L28.5714 7.63395L27.2684 4L17.8291 11.3615L21.5766 14.7533L26.6403 16.3916L27.7563 15.0711L27.2583 14.7035L28.0129 13.9688L27.4041 13.4892L28.1588 12.863L27.7664 12.0747Z" fill="#763E1A"/>
          <path d="M3.42857 7.63395L4.24387 12.0747L3.83113 12.863L4.59596 13.4892L3.98716 13.9688L4.74172 14.7035L4.24387 15.0711L5.3598 16.3916L10.4234 14.7533L14.1708 11.3615L4.73169 4L3.42857 7.63395Z" fill="#763E1A"/>
          <path d="M26.6403 16.3916L21.5766 14.7533L22.9162 17.2973L20.8008 21.9247L23.9364 21.883H28.4345L26.6403 16.3916Z" fill="#F5841F"/>
          <path d="M10.4234 14.7533L5.3598 16.3916L3.57593 21.883H8.06373L11.1992 21.9247L9.08386 17.2973L10.4234 14.7533Z" fill="#F5841F"/>
          <path d="M17.4811 17.5885L17.8291 11.3615L19.5423 6.63996H12.4577L14.1708 11.3615L14.519 17.5885L14.6607 18.6621L14.6708 23.278H17.3292L17.3393 18.6621L17.4811 17.5885Z" fill="#F5841F"/>
        </svg>
      )
    },
    { 
      id: 'coinbase', 
      name: 'Coinbase Wallet', 
      description: 'Connect to your Coinbase wallet',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="16" fill="#0052FF"/>
          <path d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z" fill="#0052FF"/>
          <path d="M11.5 16C11.5 13.5147 13.5147 11.5 16 11.5C18.4853 11.5 20.5 13.5147 20.5 16C20.5 18.4853 18.4853 20.5 16 20.5C13.5147 20.5 11.5 18.4853 11.5 16Z" fill="white"/>
        </svg>
      )
    },
    { 
      id: 'walletconnect', 
      name: 'WalletConnect', 
      description: 'Connect with WalletConnect',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="16" fill="#3B99FC"/>
          <path d="M9.48047 12.7692C12.7514 9.5769 17.975 9.5769 21.2458 12.7692L21.6139 13.1269C21.7741 13.2846 21.7741 13.5385 21.6139 13.6962L20.3227 14.95C20.2426 15.0288 20.1113 15.0288 20.0312 14.95L19.5217 14.4538C17.2035 12.1962 13.5229 12.1962 11.2046 14.4538L10.6539 14.9923C10.5738 15.0712 10.4426 15.0712 10.3625 14.9923L9.07122 13.7385C8.91101 13.5808 8.91101 13.3269 9.07122 13.1692L9.48047 12.7692ZM24.5208 15.9615L25.6706 17.0769C25.8308 17.2346 25.8308 17.4885 25.6706 17.6462L20.0723 23.0769C19.9121 23.2346 19.6496 23.2346 19.4894 23.0769L15.536 19.2308C15.496 19.1913 15.433 19.1913 15.393 19.2308L11.4396 23.0769C11.2794 23.2346 11.0169 23.2346 10.8567 23.0769L5.25834 17.6462C5.09812 17.4885 5.09812 17.2346 5.25834 17.0769L6.40821 15.9615C6.56842 15.8038 6.83093 15.8038 6.99115 15.9615L10.9454 19.8077C10.9855 19.8473 11.0485 19.8473 11.0885 19.8077L15.0419 15.9615C15.2022 15.8038 15.4647 15.8038 15.6249 15.9615L19.5783 19.8077C19.6183 19.8473 19.6813 19.8473 19.7214 19.8077L23.6748 15.9615C23.8488 15.8038 24.1113 15.8038 24.2715 15.9615H24.5208Z" fill="white"/>
        </svg>
      ) 
    }
  ];

  const handleConnectWallet = (walletId: string) => {
    setConnecting(true);
    setActiveWallet(walletId);
    
    // Simulate wallet connection
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      toast({
        title: "Wallet Connected",
        description: `You have successfully connected your ${walletOptions.find(w => w.id === walletId)?.name} wallet.`,
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setActiveWallet('');
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return (
    <PageLayout>
      <section className="py-16 bg-gradient-to-b from-riftx-black to-riftx-darkgreen">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Connect Your Wallet</h1>
            
            <Card className="bg-riftx-olive/20 border-riftx-olive mb-8">
              <CardHeader>
                <CardTitle>Why Connect a Wallet?</CardTitle>
                <CardDescription className="text-riftx-snow/70">
                  Connecting your wallet enables you to:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-riftx-green/20 flex items-center justify-center text-riftx-green">
                    ✓
                  </div>
                  <p>Receive tournament winnings directly to your wallet</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-riftx-green/20 flex items-center justify-center text-riftx-green">
                    ✓
                  </div>
                  <p>Register for blockchain-verified tournaments</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-riftx-green/20 flex items-center justify-center text-riftx-green">
                    ✓
                  </div>
                  <p>Collect unique NFT achievements and rewards</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-riftx-green/20 flex items-center justify-center text-riftx-green">
                    ✓
                  </div>
                  <p>Secure your identity and assets on the platform</p>
                </div>
              </CardContent>
            </Card>
            
            {!connected ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Choose a Wallet</h2>
                {walletOptions.map((wallet) => (
                  <Card key={wallet.id} className="bg-riftx-olive/20 border-riftx-olive hover:border-riftx-green transition-colors cursor-pointer">
                    <CardContent className="flex items-center justify-between p-6" onClick={() => handleConnectWallet(wallet.id)}>
                      <div className="flex items-center gap-4">
                        <div>{wallet.icon}</div>
                        <div>
                          <h3 className="font-medium">{wallet.name}</h3>
                          <p className="text-sm text-riftx-snow/70">{wallet.description}</p>
                        </div>
                      </div>
                      <Button 
                        className={`bg-riftx-green text-riftx-black hover:bg-riftx-green/90 ${connecting && activeWallet === wallet.id ? 'opacity-80 cursor-wait' : ''}`} 
                        disabled={connecting}
                        onClick={() => handleConnectWallet(wallet.id)}
                      >
                        {connecting && activeWallet === wallet.id ? 'Connecting...' : 'Connect'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                <div className="text-center mt-8">
                  <p className="text-sm text-riftx-snow/70">
                    By connecting a wallet, you agree to Rift-X's <a href="#" className="text-riftx-green hover:underline">Terms of Service</a> and acknowledge our <a href="#" className="text-riftx-green hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            ) : (
              <Card className="bg-riftx-olive/20 border-riftx-olive">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {walletOptions.find(w => w.id === activeWallet)?.icon}
                    <span>Wallet Connected</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-riftx-black/30 rounded-md">
                    <p className="text-sm text-riftx-snow/70">Wallet Type</p>
                    <p className="font-medium">{walletOptions.find(w => w.id === activeWallet)?.name}</p>
                  </div>

                  <div className="p-4 bg-riftx-black/30 rounded-md">
                    <p className="text-sm text-riftx-snow/70">Wallet Address</p>
                    <p className="font-medium truncate">0x7F9e3A15A6B8F3df6844D3F9315a1A3616d1B25C</p>
                  </div>

                  <div className="p-4 bg-riftx-black/30 rounded-md">
                    <p className="text-sm text-riftx-snow/70">Connection Status</p>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-riftx-green rounded-full"></span>
                      <p className="font-medium">Active</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-riftx-olive/30 pt-4">
                  <Button 
                    variant="outline" 
                    className="border-riftx-olive text-riftx-snow hover:bg-riftx-black/30 w-full" 
                    onClick={handleDisconnect}
                  >
                    Disconnect Wallet
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default WalletConnectPage;
