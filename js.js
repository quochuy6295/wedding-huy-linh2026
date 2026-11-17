// ani 2 ảnh
window.addEventListener('DOMContentLoaded', () => {
    const imgs = document.querySelectorAll('.gt_img');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.3
    });

    imgs.forEach(img => observer.observe(img));
});




// 3 ảnh
window.addEventListener('scroll', () => 
{
    document.querySelectorAll('.img_small').forEach(el => 
    {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0)
        {
            // el.classList.add('album_hihi');
            el.classList.remove('js_left');
            el.classList.remove('js_right');
        }
    });
});

window.addEventListener('scroll', () => {
    const el = document.querySelector('.img_big');
    if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.remove('js_center');
        }
    }
});

// lời mời




// cf nha
document.addEventListener('DOMContentLoaded', () => {
    const cfContainer = document.querySelector('.cf_container');

    if (cfContainer) {
        const observer2 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.3
        });

        observer2.observe(cfContainer);
    }
});




// ani album
window.addEventListener('scroll', () => 
{
    document.querySelectorAll('.js_album').forEach(el => 
    {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0)
        {
            // el.classList.add('album_hihi');
            el.classList.remove('album_left');
            el.classList.remove('album_right');
        }
        // else
        // {
        //     el.classList.add('album_left');
        //     el.classList.add('album_right');
        // }
    });
});

// thank
document.addEventListener('DOMContentLoaded', () => {
    const thankDesc = document.querySelector('.thank_desc');

    if (thankDesc) {
        const observer3 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.3 });

        observer3.observe(thankDesc);
    }
});


// nhạc
window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('myAudio');
    const indicator = document.getElementById('audioIndicator');
  
    const playAudio = () => {
      if (!audio.paused) return;
  
      audio.play()
        .then(() => {
          console.log('Phát nhạc thành công');
          indicator.style.display = 'none'; // ẩn cái loa
          removeListeners();
        })
        .catch((err) => {
          console.warn('Trình duyệt chặn phát nhạc:', err);
          // Vẫn giữ loa lại để chờ thao tác khác
        });
    };
  
    const removeListeners = () => {
      ['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, playAudio);
        document.removeEventListener(evt, playAudio);
      });
    };
  
    // Gán tất cả sự kiện tương tác
    ['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(evt => {
      window.addEventListener(evt, playAudio);
      document.addEventListener(evt, playAudio);
    });
  });


// cánh hoa cưới rơi
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('petalCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const motionQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  // Edge trên Windows tự bật "prefers-reduced-motion: reduce" khi người dùng tắt
  // mục "Hiệu ứng chuyển động" (Animation effects) trong Windows.
  // Khi đó hoa vẫn rơi nhưng chậm và thưa hơn, thay vì đứng yên như trước.
  const reduced = () => !!motionQuery.matches;

  const COLORS = [
    ['#fff0f6', '#f6b3ca'],
    ['#ffe3ee', '#f19fbb'],
    ['#fff7fa', '#f8c4d6'],
    ['#ffd8e6', '#ee8baa'],
  ];

  const rand = (min, max) => min + Math.random() * (max - min);

  let width = 0;
  let height = 0;
  let petals = [];
  let rafId = null;
  let timerId = null; // chế độ dự phòng khi requestAnimationFrame bị treo
  let lastTime = 0;
  let lastFrameAt = 0;
  let visible = !document.hidden;

  function createPetal(scatter) {
    const size = rand(9, 19) * (width < 480 ? 0.9 : 1);
    return {
      x: rand(-24, width + 24),
      y: scatter ? rand(-height, height) : rand(-100, -14),
      size,
      speed: rand(16, 34) * (size / 14),
      wind: rand(4, 13),
      sway: rand(10, 34),
      swaySpeed: rand(0.4, 1.2),
      phase: rand(0, Math.PI * 2),
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.45, 0.45),
      flip: rand(0, Math.PI * 2),
      flipSpeed: rand(0.6, 1.6),
      alpha: rand(0.45, 0.9),
      colors: COLORS[(Math.random() * COLORS.length) | 0],
    };
  }

  function petalTarget() {
    const base = Math.min(36, Math.max(16, width / 26));
    return Math.round(base * (reduced() ? 0.6 : 1));
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = petalTarget();
    if (!petals.length) {
      petals = Array.from({ length: target }, () => createPetal(true));
    } else if (petals.length < target) {
      while (petals.length < target) petals.push(createPetal(true));
    } else if (petals.length > target) {
      petals.length = target;
    }

    // luôn vẽ ngay một khung hình, không chờ requestAnimationFrame
    paint();
  }

  function drawPetal(petal, x) {
    const s = petal.size;
    ctx.save();
    ctx.translate(x, petal.y);
    ctx.rotate(petal.rot);

    // hiệu ứng lật cánh hoa
    const flipScale = 0.35 + 0.65 * Math.abs(Math.sin(petal.flip));
    ctx.scale(flipScale, 1);
    ctx.globalAlpha = petal.alpha;

    const grad = ctx.createLinearGradient(0, -s, 0, s);
    grad.addColorStop(0, petal.colors[0]);
    grad.addColorStop(1, petal.colors[1]);
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.9, -s * 0.55, s * 0.65, s * 0.7, 0, s);
    ctx.bezierCurveTo(-s * 0.65, s * 0.7, -s * 0.9, -s * 0.55, 0, -s);
    ctx.closePath();
    ctx.fill();

    // gân cánh hoa mờ
    ctx.globalAlpha = petal.alpha * 0.55;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = Math.max(0.5, s * 0.06);
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.65);
    ctx.quadraticCurveTo(s * 0.12, 0, 0, s * 0.7);
    ctx.stroke();

    ctx.restore();
  }

  // vẽ tĩnh: dùng khi máy bật "giảm chuyển động" hoặc khi chưa kịp chạy animation
  function paint() {
    ctx.clearRect(0, 0, width, height);
    for (const petal of petals) {
      const swayX = Math.sin(petal.phase) * petal.sway;
      drawPetal(petal, petal.x + swayX);
    }
  }

  function step(now) {
    if (!visible) return;
    if (!lastTime) lastTime = now;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    const slow = reduced() ? 0.4 : 1;
    const t = now / 1000;

    ctx.clearRect(0, 0, width, height);

    for (const petal of petals) {
      petal.y += petal.speed * slow * dt;
      petal.x += petal.wind * slow * dt;
      petal.rot += petal.rotSpeed * slow * dt;
      petal.flip += petal.flipSpeed * slow * dt;

      const swayX = Math.sin(t * petal.swaySpeed + petal.phase) * petal.sway;

      if (petal.y - petal.size > height + 10 || petal.x > width + 80) {
        Object.assign(petal, createPetal(false));
      } else {
        drawPetal(petal, petal.x + swayX);
      }
    }

    lastFrameAt = Date.now();
  }

  function frame(now) {
    if (!visible) {
      rafId = null;
      return;
    }
    step(now);
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (!visible || timerId) return;
    if (rafId) return;
    lastTime = 0;
    lastFrameAt = Date.now();
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  // Một số bản Edge / chế độ tiết kiệm pin tạm dừng requestAnimationFrame
  // (nhất là khi cửa sổ bị che khuất). Nếu quá 900ms không có khung hình nào,
  // tự chuyển sang vẽ bằng setInterval để hoa vẫn rơi.
  function watchdog() {
    if (!visible || timerId) return;
    if (Date.now() - lastFrameAt < 900) return;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lastTime = 0;
    timerId = setInterval(() => step(Date.now()), 33);
  }

  // áp dụng lại khi người dùng bật/tắt "giảm chuyển động"
  function applyMotionPreference() {
    resize();
    start();
  }

  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', resize);
  window.addEventListener('pageshow', () => {
    visible = !document.hidden;
    start();
  });
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    if (!visible) {
      stop();
    } else {
      start();
    }
  });

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener('change', applyMotionPreference);
  } else if (motionQuery.addListener) {
    motionQuery.addListener(applyMotionPreference);
  }

  resize();
  start();
  setInterval(watchdog, 800);
});


// tự động cuộn nhẹ xuống, dừng ngay khi người xem tự cuộn / chạm vào trang
window.addEventListener('DOMContentLoaded', () => {
  const motionQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  const START_DELAY = 2500; // chờ một chút cho trang ổn định rồi mới trôi
  const DURATION = 32000;   // thời gian ước tính để đi hết trang (ms)
  const MIN_SPEED = 40;     // px/giây
  const MAX_SPEED = 220;    // px/giây

  const html = document.documentElement;
  let rafId = null;
  let timerId = null;
  let last = 0;
  let lastStepAt = 0;
  let speed = 0;
  let measuredAt = 0;
  let started = false;
  let stopped = false;
  let paused = false;

  function measure() {
    const total = Math.max(0, html.scrollHeight - window.innerHeight);
    // máy bật "giảm chuyển động" -> trôi chậm hơn
    const duration = motionQuery.matches ? DURATION * 1.6 : DURATION;
    speed = Math.min(MAX_SPEED, Math.max(MIN_SPEED, total / (duration / 1000)));
    measuredAt = Date.now();
    return total;
  }

  function advance(nowMs) {
    if (stopped || paused) return;

    if (!last) last = nowMs;
    let dt = (nowMs - last) / 1000;
    last = nowMs;
    if (dt <= 0) return;
    dt = Math.min(dt, 0.25);

    if (Date.now() - measuredAt > 1000) measure();

    const maxY = html.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxY - 2) {
      stop();
      return;
    }

    window.scrollBy(0, speed * dt);
    lastStepAt = Date.now();
  }

  function step(now) {
    rafId = null;
    advance(now);
    if (!stopped && !paused) rafId = requestAnimationFrame(step);
  }

  // rAF có thể bị trình duyệt tạm dừng (cửa sổ bị che, chế độ tiết kiệm pin...).
  // Khi đó vẫn bước tiếp bằng bộ đếm thời gian để trang không đứng im.
  function watchdog() {
    if (!started || stopped || paused) return;
    if (Date.now() - lastStepAt < 600) return;
    advance(Date.now());
    if (!rafId && !stopped && !paused) {
      last = 0;
      rafId = requestAnimationFrame(step);
    }
  }

  function play() {
    if (stopped || paused || rafId) return;
    last = 0;
    lastStepAt = Date.now();
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    stopped = true;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (timerId) clearInterval(timerId);
    timerId = null;
    html.style.scrollBehavior = ''; // trả lại cuộn mượt mặc định
  }

  // người xem chủ động cuộn / chạm / bấm phím -> tắt hẳn hiệu ứng
  ['wheel', 'touchstart', 'touchmove', 'keydown', 'mousedown'].forEach((evt) => {
    window.addEventListener(evt, stop, { passive: true });
  });

  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (paused) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (started) {
      play();
    }
  });

  setTimeout(() => {
    if (stopped) return;
    started = true;
    // tắt "scroll-behavior: smooth" để từng khung hình không bị cộng dồn
    html.style.scrollBehavior = 'auto';
    measure();
    play();
    timerId = setInterval(watchdog, 400);
  }, START_DELAY);
});

  
  




  