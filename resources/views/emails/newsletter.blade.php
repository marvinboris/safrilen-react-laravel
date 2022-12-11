<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<div
    style="display: block; box-sizing: border-box; background-color: white; color: #5A657D; width: 100%; font-size: 0.8rem; font-family: Poppins, Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
    <img src="{{ asset('/images/publications/' . $publication['photo']) }}" style="width: 100%, height: auto;" />

    <div style="padding: 1rem 5%;">
        <div style="font-size: 2rem; font-weight: 500; margin-bottom: 1rem;">{{ $publication['title'] }}</div>

        {!! $publication['body'] !!}
    </div>
</div>
