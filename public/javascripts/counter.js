window.onload = function() {

    // Shared options for scroll spy.
    const animateOptions = {
        autoAnimate: true,
        autoAnimateOnce: true,
    }

    // Total Counter consts
    const totalKits = new countUp.CountUp('count-total-kits', 3, {
        ...animateOptions,
        suffix: 'm',
        // Higher duration as it syncs up faster due to single digit I believe.
        duration: 5
    });

    const assemblyDays = new countUp.CountUp('count-assembly', 303, {
        ...animateOptions,
        duration: 3
    });

    const totalVolunteers = new countUp.CountUp('count-volunteers', 15, {
        ...animateOptions,
        suffix: 'k',
        duration: 3
    });

    const totalMothers = new countUp.CountUp('count-mothers', 258, {
        ...animateOptions,
        suffix: 'k',
        duration: 3
    });

};