import { Observable } from 'rxjs';

export function fromResizeObserver(
  element: HTMLElement
): Observable<ResizeObserverEntry[]> {
  return new Observable((subscriber) => {
    const resizeObserver = new ResizeObserver((entries) => {
      subscriber.next(entries);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  });
}
