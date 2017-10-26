import pika
import sys

connection = pika.BlockingConnection(pika.ConnectionParameters('172.21.0.2'))
channel = connection.channel()

channel.queue_declare(queue='task_queue', durable=True)

message = ' '.join(sys.argv[1:]) or "Hello World...!"
channel.basic_publish(exchange='', routing_key='task_queue', body=message,
						properties=pika.BasicProperties(
							delivery_mode=2,
					))

print(" [x] sent %r" % message)

channel.close()