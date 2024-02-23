import re
import re
import smtplib
import dns.resolver

fromAddress = 'test@example.com'

regex = '^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$'

inputAddress = "ucss.sumitjoshi@gmail.com"
addressToVerify = str(inputAddress)

match = re.match(regex, addressToVerify)
if match == None:
   print('Bad Syntax')

splitAddress = addressToVerify.split('@')
domain = str(splitAddress[1])
print('Domain:', domain)

records = dns.resolver.resolve(domain, 'MX')
mxRecord = records[0].exchange
mxRecord = str(mxRecord)


server = smtplib.SMTP()
server.set_debuglevel(0)

server.connect(mxRecord)
server.helo(server.local_hostname)
server.mail(fromAddress)
code, message = server.rcpt(str(addressToVerify))
server.quit()

if code == 250:
   print('Success')
else:
   print('Bad')