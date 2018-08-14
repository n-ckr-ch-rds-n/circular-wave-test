# Circular Wave Technical Assessment #

For this assessment I had to fix some broken JS code.

## What the app does ##

On running `index.html` in a browser, the app shows a list of line items of employee shifts. On pressing the "Get next" button, the app

1. Changes the text and style of the "Get next" button to "Loading..."
2. Synchronously retrieves a random number of record IDs from a "server" (this is simulated and doesn't require an internet connection)
3. Asynchronously retrieves the corresponding records from the "server", only proceeding when all records have been received
4. Sorts the records in date order, oldest first
5. Renders the records into the table
6. Calculates total hours worked and renders them into the table
7. Resets the button to its original state

## What I needed to fix ##

1. Ensure the "Get data" button changes its appearance correctly
- I solved this by giving a second parameter to the toggleButton function and referring to the parameter in the function rather than to 'this'. The function changes the button but remains generic: it could be used to change the appearance of any button.

2. Aggregate the "async" data returned from the server, only proceeding once all responses are received
- I feel that my solution to this was a bit cheeky in some regards. My function iterates over the array of ids and gets the record for each, storing the records one by one in an array. The array is sent to the record processing function only if it is the same length as the initial array of ids (that's the cheeky part). I could have solved this in a more complicated way, using Promise and Resolve, for instance, but there didn't seem to be any need. I added a catch block to the 'server' call that logs any errors to the console.

3. Sort the records according to date, oldest first
This was surprisingly tricky! I used JS's sort method to sort the array of records by .date, but in order to do so I needed to reformat the date so that it was readable by 'new Date'. In my solution this involved using the 'split' method on the date to turn it into an array, and passing each element in the date to 'new Date' individually.

4. Ensure the records render properly in the table
Used a basic forEach function to parse the data.

5. Ensure the totals are correct
I added a parseInt function to process the .hoursWorked property of the data. This ensures that the hours are processed as integers and not as strings.

6. Ensure the button returns to its starting "Get data" state
This was simple to implement, having given the toggleButton two arguments. I just had to pass 'btn' to toggleButton when it's called by the processRecords function.

## Final Words ##

This was a very enjoyable test that took me around 4 hours to complete. It would've taken longer if I had written tests: I hope they weren't expected! Let me know if you want me to write some tests for the functions and I'll rustle some up.
Many thanks for the opportunity!
