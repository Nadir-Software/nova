try:
    print("Please be patient, this should only take a few seconds.")
    print("Getting ready to update and open NovaAI...")

    # Import os to delete unneeded file
    import os

    # Import zipfile to unzip files
    import zipfile

    # Import urllib.request to download files
    import urllib.request

    # Import webbrowser to open file
    import webbrowser

    # Define URL and filename
    url = "https://github.com/Nadir-Software/NovaAI/archive/refs/heads/main.zip"
    filename = "deletethis.zip"

    # Download the file from the URL and save it to the local file system
    print("Downloading file...")
    urllib.request.urlretrieve(url, filename)

    # Extract
    print("Extracting file...")
    with zipfile.ZipFile(filename, "r") as zip_ref:
        zip_ref.extractall()

    # Clean up
    print("Cleaning up...")
    os.remove("deletethis.zip")

    # Open
    webbrowser.open("NovaAI-main/Nova/index.html")

    exit()

except:
    print("An error occurred, most likely you don't have an Internet connection.")
    print("Would you like to try to run an installed version of NovaAI?")
    confirm = str(input("[y/n]")).lower()

    print()
    print()
    print()

    if "n" in confirm:
        input("Press Enter to exit...")
        exit()
    
    try:
        webbrowser.open("NovaAI-main/Nova/index.html")
    
    except:
        print("You do not appear to have NovaAI installed on your system.")
        print("Please run this program again when you have an Internet connection.")
        input("Press Enter to exit...")
        exit()