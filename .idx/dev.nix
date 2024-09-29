# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.go
    # pkgs.python311
    # pkgs.python311Packages.pip
     pkgs.nodejs_20
    # pkgs.nodePackages.nodemon
    pkgs.deno
    pkgs.bun
    pkgs.github-cli
    pkgs.github-release
    pkgs.neofetch
    pkgs.wine64
    pkgs.wine
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
         web = {
        #   # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
        #   # and show it in IDX's web preview panel
         command = ["bun" "run" "dev"];
         manager = "web";
           env = {
             # Environment variables to set for your server
             PORT = "$PORT";
           };
         };
      };
    };
  };
}
