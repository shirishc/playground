import pika
import sys

connection = pika.BlockingConnection(pika.ConnectionParameters('172.21.0.2'))
channel = connection.channel()

channel.exchange_declare(exchange='logs', exchange_type="fanout")

message = ' '.join(sys.argv[1:]) or "Hello World...!"
channel.basic_publish(exchange='logs', routing_key='', body=message)

print(" [x] sent %r" % message)

channel.close()