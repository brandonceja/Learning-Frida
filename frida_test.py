import frida

# Script copied from the official frida documentation

def on_message(message, data):
    print("[on_message] message:", message, "data: ", data)

session = frida.attach("notepad.exe")

script =  session.create_script("""
    rpc.exports.enumerateModules = function (){
        return Process.enumerateModules();
    };
""")

script.on("message", on_message)
script.load()